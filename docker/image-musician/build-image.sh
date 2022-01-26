#!/bin/bash

docker build -t api/orchestra-musician .

read -n 1 -s -r -p "Press any key to continue"