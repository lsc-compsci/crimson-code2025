import base
import openai

print(openai.api_key) # testing get key

num_questions = 5
topic = "Color Theory"
 
# question types: 1 - one answer; 2 - multiple answers

prompt = f"""
Generate {num_questions} intermediate level questions on the topic "{topic}" with three question types:
1. single answer (True/False, Select an answer from the list)
2. multiple answer questions (Select all that applies)
3. fill-in-the-blank quesitons.
Return the result in valid JSON format like the following example:
[
    {{
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Rome"],
        "answer": "Paris",
    }},

    {{
        "question": "Which of these are cities?",
        "options": ["Paris", "London", "China", "Berlin"],
        "answer": ["Paris", "London", "Berlin"],
    }},
    
    {{
        "question": "A cat is a dog.",
        "options": ["True", "False"],
        "answer": "False",
    }},

    {{
        "question": "Water is a ___",
        "options": ["Liquid", "Solid", "Gas"],
        "answer": "Liquid",
    }},

    ...
]
"""

response = openai.ChatCompletion.create(
    model="gpt-4o",  # model name
    messages=[
        {"role": "user", "content": prompt}
    ],
    max_tokens=500,   # expected output
    temperature=0.5  # creativity - deterministic level
)

generated_text = response.choices[0].message.content.strip()

print(generated_text)