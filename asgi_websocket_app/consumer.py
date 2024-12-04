import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from asyncio.subprocess import PIPE, create_subprocess_exec
import json, os, uuid
import docker

class CompilerConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "compiler_room"
        # Add the user to the WebSocket group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Remove the user from the WebSocket group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Parse the received data
        data = json.loads(text_data)
        code = data.get('code')
        language = data.get('language')
        user_input = data.get('input', "")

        # Run the compilation/execution process
        await self.run_code(language, code, user_input)

    async def send_output(self, message):
        # Send the output of code execution back to the client
        await self.send(json.dumps(message))

    async def run_code(self, language, code, user_input):
        unique_id = str(uuid.uuid4())  # Generate a unique identifier for the code execution
        temp_file = f"/tmp/{unique_id}_code.{language}"
        output_file = f"/tmp/{unique_id}_output.txt"
        
        # Define the Docker image and commands based on the language
        language = language.lower()
        command = None
        docker_image = None
        run_command = None
        container = None
        
        if language == 'python':
            docker_image = 'python-app'
            command = f"python3 {temp_file}"
        elif language == 'java':
            docker_image = 'java-app'
            command = f"bash -c 'javac {temp_file} && java {os.path.splitext(os.path.basename(temp_file))[0]}'"
        elif language == 'cpp':
            docker_image = 'cpp-app'
            command = f"bash -c 'g++ -o main {temp_file} && ./main'"
        else:
            await self.send_output({"status": "error", "output": "Unsupported language."})
            return

        try:
            # Create a temporary file for the code
            with open(temp_file, "w") as file:
                file.write(code)

            # Initialize Docker client
            client = docker.from_env()

            # Run the code in the appropriate Docker container
            container = client.containers.run(
                docker_image,
                command=command,
                volumes={temp_file: {'bind': '/usr/src/app/' + os.path.basename(temp_file), 'mode': 'rw'}},
                detach=True,
                stdout=PIPE,
                stderr=PIPE,
                # stdin=PIPE
            )

            # Communicate with the container
            exec_stdout, exec_stderr = await container.wait()
            output = exec_stdout.decode() + exec_stderr.decode()
            print(output)
            # Collect the output
            await self.send_output({"status": "success", "output": output})

        except Exception as e:
            # Handle errors and send back the error message
            await self.send_output({"status": "error", "output": str(e)})

        finally:
            # Clean up temporary files if they exist
            if os.path.exists(temp_file):
                os.remove(temp_file)

            # Clean up Docker container only if it was created
            if container:
                container.remove()