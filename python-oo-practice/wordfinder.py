from random import randint

"""Word Finder: finds random words from a dictionary."""


class WordFinder:

    """
    Given a file path, initialize WordFinder object to open and read a file, and print the number of words are in the file
    """
    def __init__(self, path):
        self.file = open(path, 'r')
        self.lst = []
        self.make_list()
        print(f"{len(self.lst)} words read")
        self.file.close()

    """
    Make an attribute of a list of the words found on the file
    """
    def make_list(self):
        for line in self.file:
            self.lst.append(line)


    """
    Print a random word from the file (no newline character)
    """
    def random(self):
        print(self.lst[randint(0,len(self.lst))].rstrip('\n'))
