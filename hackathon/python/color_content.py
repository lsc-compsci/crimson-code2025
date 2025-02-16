import base
import openai
print(openai.api_key) # testing get key

num_questions = 3
topic = "Color Theory"

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

response = openai.Completion.create(
    model="gpt-3.5-turbo",  # or another model as appropriate
    prompt=prompt,
    max_tokens=500,   # adjust based on expected output
    temperature=0.7   # controls creativity
)
generated_text = response.choices[0].text.strip()

print(generated_text)
