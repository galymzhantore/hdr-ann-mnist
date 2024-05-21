import torch

class MNISTNet(torch.nn.Module):
    def __init__(self, n_hidden_neurons, n_hidden_layers):
        super().__init__()
        self.layers = n_hidden_layers
        self.fc1 = torch.nn.Linear(28 * 28, n_hidden_neurons)
        self.ac1 = torch.nn.Sigmoid()
        for i in range(n_hidden_layers - 1):
            setattr(self, f'fc{i+2}', torch.nn.Linear(n_hidden_neurons, n_hidden_neurons))
            setattr(self, f'ac{i+2}', torch.nn.Sigmoid())
        self.fcn = torch.nn.Linear(n_hidden_neurons, 10)
    def forward(self, x):
        x = self.fc1(x)
        x = self.ac1(x)
        for i in range(self.layers - 1):
            x = getattr(self, f'fc{i+2}')(x)
            x = getattr(self, f'ac{i+2}')(x)
        x = self.fcn(x)
        return x