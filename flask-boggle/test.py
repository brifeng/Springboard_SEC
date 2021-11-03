from unittest import TestCase
from app import app


class BoggleGameTests(TestCase):
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_home(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Boggle Game</h1>', html)
            self.assertIn("<button id='start'>Start Game!</button>", html)
            self.assertIn("<h3 id='score'>Score: 0</h3>", html)

    def test_valid_word(self):
        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                ]
        resp = self.client.get('/check-word/test')
        html = resp.get_data(as_text=True)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(html, 'ok')

    def test_invalid_word(self):
        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                ]
        resp = self.client.get('/check-word/word')
        html = resp.get_data(as_text=True)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(html, 'not-on-board')

    def test_not_word(self):
        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                    ["T", "E", "S", "T", "T"],
                ]
        resp = self.client.get('/check-word/asd')
        html = resp.get_data(as_text=True)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(html, 'not-word')