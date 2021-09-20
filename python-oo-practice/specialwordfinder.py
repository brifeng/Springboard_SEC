from wordfinder import WordFinder

class SpecialWordFinder(WordFinder):

    def make_list(self):
        for line in self.file:
            if not line.startswith('\n') and not line.startswith('#'):
                self.lst.append(line)