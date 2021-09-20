"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    """
    Initialize a number generator with a starting number and current number.
    """
    def __init__(self, start):
        self.start = start
        self.current = start

    
    def __repr__(self):
        return f"<SerialGenerator start={self.start} next={self.current}>"

    """Print the current number and increment the current number by 1"""
    def generate(self):
        print(self.current)
        self.current+=1

    """Change the current number to the starting number with which the number generator was initialized"""
    def reset(self):
        self.current = self.start