# Handwritten Digit Recognition based on ANN using MNIST dataset

This mini-project is aims to develop a simple web application that recognizes and classify the digits (0 - 9) drawn on the HTML canvas. Utilizing ML techniques, artificial neural network (ANN) and trained on the MNIST dataset, which consists of 60,000 training models and 10,000 test images of handwritten digits.

## Contents
[1. Installation](#c1)<br>

[2. ANN](#c2)<br>
[2.1 Hyperparameters tuning](#c21)<br>
[2.2 Accuracy results](#c22)<br>

[3. Web Part](#c3)<br>

[4. Potential Enhancements](#c4)<br>

[5. References](#c5)<br>

<hr>

## <a name="c1"></a> 1. Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/galymzhantore/hdr-ann-mnist
    cd hdr-ann-mnist
    ```

2. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Run the application:
    ```bash
    python main.py
    ```
## <a name="c2"></a> 2. ANN.
Artificial Neural Network was designed based on the simple architecture containing layers of $torch.nn.Linear$ and several activiation functions. The network utilizes the Cross Entropy Loss function, which is particularly effective for multi-class classification tasks, and the Adam optimizer, chosen according to [1], which ensures high accuracy in training neural networks.

### <a name = "c21"></a> 2.1. Hyperparameters tuning.
In order to achieve high accuracy during training process, it is important to tune special hyperparameters. The following hyperparameters were used: 
  * Batch Sizes = 2900
  * Learning Rate = 0.01
  * Number of hidden neurons = 1400
  * Number of hidden layers = 1
  * Number and types of activation functions (Sigmoid, ReLU, Tanh) = ReLU
(more information about tuning process you can see in the train.ipynb file)

### <a name = "c22"></a> 2.2. Accuracy Results.
Using Artificial Neural Network with appropriate hyperparameters, 98.xx% accuracy within 100 epochs has been achieved.
#### Accuracy vs. Epoch Graph

#### Confusion Matrix

## <a name = "c3"></a> 3. Web Part.
### FrontEnd (HTML + CSS + JS)
  * HTML Canvas for drawing digits.
  * Buttons for clearing and submitting the canvas.
  * Displaying the received prediction in the TextArea
### BackEnd (Flask + PyTorch + JS Queries)
  * Receives the submitted 100x100 canvas image.
  * Preprocessing the image(resizing to 28x28, grayscaling, normalization, tensoring the ImageData.data property)
  * Using the pretrained ANN model to predict the received tensored image.
  * Sending back to the frontend

## <a name="c4"></a> Potential Enhancements

For the problem of Handwritten Digit Recognition (HDR), Convolutional Neural Networks (CNN) approach is more common rather than linear ANN approach. As CNN provides for non-linear tranformations, which allows for more precise and high accuracy computations. Moreover, during resizing process, image was distorted leading to less accurate precision in the output. Therefore, it would be more sophisticated to have different approach to resizing and grayscaling process.

##  <a name="c5"></a> References
\[1\] Savita Ahlawat, Amit Choudhary, Anand Nayyar, Saurabh Singh, and Byungun Yoon. Improved handwritten digit recognition using convolutional neural networks (cnn). Sensors, 20(12):3344, 2020.


  

