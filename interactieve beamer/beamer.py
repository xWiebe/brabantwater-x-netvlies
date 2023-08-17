# GPIO pin 16 in gebruik

sudo apt-get update

sudo apt-get upgrade

sudo apt-get install python3-pip omxplayer fbi

pip3 install rpi-vidlooper 

//the script vidlooper is installed  '/home/pi/.local/bin' which is not on PATH."

troubleshoot

fix command = PATH=/home/pi/.local/bin:$PATH

vidlooper --help #om te kijken of het werkt

-------------------------
 #code knop met beamer

import RPi.GPIO as GPIO
import time 
import os

BUTTON_PIN = 16
GPIO.setmode(GPIO.BCM)

GPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

prev_button_state = GPIO.input(BUTTON_PIN)

path ="/home/pi/Videos"

try:
    while True:
        time.sleep(0.1)
        button_state = GPIO.input(BUTTON_PIN)
        if button_state != prev_button_state:
            prev_button_state = button_state
            if button_state == GPIO.HIGH:
                print("knop is losgelaten")
                os.system("omxplayer 3.mp4")

except KeyboardInterrupt:
    GPIO.cleanup()
