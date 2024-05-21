from flask import Flask,render_template, request, jsonify
from train.simple_architecture import MNISTNet
import torch

result_final_display = None
app = Flask(__name__, template_folder='templates')
def predict(tensor):
    model = MNISTNet(1400, 1)
    model.load_state_dict(torch.load('./model/hdr.pth', map_location=torch.device('cpu'
    ))['model_state_dict'])
    pred = model.forward(tensor)
    return pred.argmax(dim=1).item()
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    result = data['value']
    if(result == None):
        return jsonify({'prediction': 'No data'})
    tensor = torch.tensor(result).float().reshape(-1,28 * 28)
    result_final_display = predict(tensor)
    return jsonify({'prediction': result_final_display})


if __name__ == '__main__':
    app.run(debug=True)

