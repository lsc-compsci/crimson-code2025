import base
import openai

print(openai.api_key) # testing get key

num_questions = 3
topic = "Typography Principles"

prompt = f"""
Generate {num_questions} multiple-choice questions on the topic "{topic}".
Return the result in valid JSON format like the following example:
[
    {{
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Rome"],
        "answer": "Paris"
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
    temperature=0.7   # creativity
)

generated_text = response.choices[0].message.content.strip()

print(generated_text)