def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    num_count = {num: nums.count(num) for num in nums}
    mode_count = max(num_count.values())
    for k, v in num_count.items():
        if v == mode_count:
            return k
    return 'err'