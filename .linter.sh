#!/bin/bash
cd /home/kavia/workspace/code-generation/deliversync-15085-f7b84f13/deliver_sync
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

