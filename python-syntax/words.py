def print_upper_words(str, must_start_with=None):
    """
    Prints out each word on a separate line, but in all uppercase

    The first argument is the list of words to potentially print.

    The second argument is the list of letters such that this will only print words that start with one of those letters.
    If the second argument is not entered, this will print all words in uppercase.
    """

    if must_start_with == None:
        for word in str:
            print(word.upper())
        return

    for word in str:
        for char in must_start_with:
            if word[0].lower() == char:
                print(word.upper())


# this should print "HELLO", "HEY", "YO", and "YES"
print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                  must_start_with={"h", "y"})
