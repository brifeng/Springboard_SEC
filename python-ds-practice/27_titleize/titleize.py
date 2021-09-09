def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    lst = phrase.split(' ')
    output = []
    for word in lst:
        output.append(word.lower().capitalize())
    return ' '.join(output)