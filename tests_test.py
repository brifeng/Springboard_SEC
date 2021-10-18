import test
from unittest import TestCase



class AdditionTestCase(TestCase):
    """Examples of unit tests."""
    def test_adder(self):
        assert test.adder(2, 3) == 5

    def test_adder_2(self):
        self.assertEqual(test.adder(2, 2), 4)
