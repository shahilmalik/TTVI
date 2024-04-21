from gtts import gTTS
import random
import string
from django.shortcuts import render, redirect
import os
# import pyttsx3
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Level
# import pygame
import json

def generate_random_letters_from_string(input_str, output_length):
    # Generate a string of random letters from the input string
    random_letters = ''.join(random.choice(input_str) for _ in range(output_length))
    return random_letters

# def text_to_speech(text):
#     # Create a gTTS object
#     tts = gTTS(text=text, lang='en')

#     # Save the audio file
#     tts.save("output.mp3")

#     # Initialize pygame mixer
#     pygame.mixer.init()

#     # Load the audio file
#     pygame.mixer.music.load("output.mp3")

#     # Play the audio
#     pygame.mixer.music.play()

#     # Wait for the audio to finish playing
#     while pygame.mixer.music.get_busy():
#         pygame.time.Clock().tick(10)



# Create your views here.
def home_view(request):
    #lesson 1
    
    print("test text")
    # home_text="Welcome, Learner."
    # home_text_guide="Use the control key at the left most bottom of the keyboard to navigate between different options. The longest key in the last row is the space key, use space key to select."
    # text_to_speech(home_text)
    # text_to_speech(home_text_guide)
    level_instance = Level.objects.first()

    # Check if the instance exists
    if level_instance:
        level_value = level_instance.level
        sublevel_value = level_instance.subLevel
    print(level_instance)
    return render(request,'lessons.html',{"level_instance":level_value,"subLevel_instance":sublevel_value})

def taketest(request):
    text = "The test starts in 3... 2... 1..."
    
    # Define a list of base strings for each set of generated texts
    base_strings = ['asdf', 'jkl;', 'fgtrcv' , 'jhyunm' , 'dex', 'ki,' , 'swz', 'lo.' , 'aq' , ';p' ]
    size = 5

    # Create a dictionary to store the generated texts and counters
    generated_texts_context = {}

    # Loop through the list and generate/initialize the texts if not in session
    for base_string in base_strings:
        set_key = f'generated_text_{base_string}'
        generated_text = request.session.get(set_key)

        if not generated_text:
            # Use a default length (e.g., 10) or replace it with your desired logic
            generated_text = generate_random_string_from_base(base_string, size)
            request.session[set_key] = generated_text
            print(f"Generated Text for {base_string}:", generated_text)

            # Initialize the counter for incorrect key presses
            request.session[f'incorrect_presses_{base_string}'] = 0

        # Add the generated text to the context dictionary
        generated_texts_context[set_key] = generated_text

  
    generated_texts_context = json.dumps(generated_texts_context)

    context = {
        'generated_texts_context': generated_texts_context,
        'size':size,
    }
    return render(request, 'home3.html', context)




def generate_random_string_from_base(base_string, length):
    random_string = ''.join(random.choice(base_string) for _ in range(length))
    return random_string


def check(request):
    print("this is Check page")
    return render(request,'check_postition.html',{})


# @csrf_exempt  # Only for demo purposes, consider using a proper CSRF protection method
# def update_level(request):
#     if request.method == 'POST':
#         level_value = request.POST.get('level')

#         # Save the level to the database
#         Level.objects.create(level=level_value)

#         return JsonResponse({'status': 'success'})

#     return JsonResponse({'status': 'error'})

def validate_text(typed_text, generated_text):
    # Replace this function with your actual validation logic
    # For example, you might compare typed_text with generated_text
    # Return True if valid, False otherwise
    return typed_text == generated_text



@csrf_exempt
def update_level(request):
    if request.method == 'POST':
        level_value = request.POST.get('level')

        if level_value is not None:
            # Update the global level or some other logic based on your requirements
            # Use get_or_create to create a new level instance or retrieve the existing one
            global_level, created = Level.objects.get_or_create(id=1)
            global_level.level = level_value
            global_level.save()

            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Level not provided'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def update_sublevel(request):
    if request.method == 'POST':
        sublevel_value = request.POST.get('sublevel')

        if sublevel_value is not None:
            # Update the subLevel field
            global_level, created = Level.objects.get_or_create(id=1)
            global_level.subLevel = sublevel_value  # Update subLevel, not level
            global_level.save()

            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Sublevel not provided'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def check_position(request):
    return render(request,"check_postition.html",{})

def finger_placement_assist(request):
    return render(request,"finger_placement_assist.html",{})


def beginner_guide(request):
    return render(request,"beginner_guide.html",{})