#!/bin/bash

docker build -t api/orchestra-auditor .

read -n 1 -s -r -p "Press any key to continue"