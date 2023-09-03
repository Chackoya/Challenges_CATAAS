#!/bin/bash

#SCRIPT TO RUN THE TESTS.

#IMPORTANT: only run this script AFTER using the script_run_docker.sh .

#STEPS:
#1) Open a second terminal 
#2) use the command ./script_run_tests_running_docker.sh 
#3) All 11 tests should appear in the console.

# Execute npm test in the running container
docker exec -it challenge1-container npm test
