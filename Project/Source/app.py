import torch
from flask import Flask, render_template, request, jsonify
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

app = Flask(__name__)

tokenizer = AutoTokenizer.from_pretrained("t5-small",use_fast=False)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = (AutoModelForSeq2SeqLM
        .from_pretrained("model")
        .to(device))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    paragraph = data['paragraph']
    inputs = tokenizer.encode("summarize: " + paragraph, return_tensors="pt", max_length=512, truncation=True)
    inputs = inputs.to(device)

    summary_ids = model.generate(inputs, max_length=200, min_length=30, length_penalty=2.0, num_beams=4, no_repeat_ngram_size=3, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)