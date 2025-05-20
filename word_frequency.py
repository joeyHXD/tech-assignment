import re
from typing import List, Dict
from urllib.request import urlopen
from urllib.error import URLError, HTTPError

def retrieve_text(url: str) -> str:
    """
    Retrieve text from a given URL.
    
    Args:
        url (str): The URL to retrieve text from.
    
    Returns:
        str: The text content of the URL.
    """
    try:
        with urlopen(url) as resp:
            raw = resp.read()
        return raw.decode('utf-8')
    except HTTPError as e:
        print(f"HTTP error occurred while retrieving text from {url}. Error: {e}")
        return ""
    except URLError as e:
        print(f"Failed to retrieve text from {url}. Error: {e}")
        return ""

def normalize_text(text: str) -> str:
    """
    Normalize the text by converting punctuation to spaces and text to lowercase.

    Args:
        text (str): The text to normalize.

    Returns:
        str: The normalized text.
    """
    text = re.sub(r'[^A-Za-z\s]', ' ', text)  # Replace punctuation with spaces
    text = text.lower()
    return text

def split_into_words(text: str) -> List[str]:
    """
    Split the text into words.

    Args:
        text (str): The text to split.

    Returns:
        List[str]: A list of words.
    """
    return text.split()

def count_word_frequencies(words: List[str]) -> Dict[str, int]:
    """
    Count the frequency of each word in the list of words.

    Args:
        words (list): The list of words.

    Returns:
        Dict[str, int]: A dictionary with words as keys and their frequencies as values.
    """
    word_frequencies = {}
    for word in words:
        if word in word_frequencies:
            word_frequencies[word] += 1
        else:
            word_frequencies[word] = 1
    return word_frequencies

def sort_word_frequencies(word_frequencies: Dict[str, int]) -> List[tuple]:
    """
    Sort the word frequencies in descending order.

    Args:
        word_frequencies (Dict[str, int]): The dictionary of word frequencies.

    Returns:
        List[tuple]: A list of tuples sorted by frequency.
    """
    return sorted(word_frequencies.items(), key=lambda item: item[1], reverse=True)

def print_top_words(word_frequencies: Dict[str, int], range_start: int, range_end: int) -> None:
    """
    Print the top words within a specified range.

    Args:
        word_frequencies (Dict[str, int]): The dictionary of word frequencies.
        range_start (int): The starting index for the range.
        range_end (int): The ending index for the range.
    """
    sorted_frequencies = sort_word_frequencies(word_frequencies)
    print(f"Words ranked from {range_start}th to {range_end}th by frequency:")
    for word, freq in sorted_frequencies[range_start-1:range_end-1]:
        print(f"{word}: {freq}")

def main():
    url = "https://www.gutenberg.org/cache/epub/16317/pg16317.txt"
    text = retrieve_text(url)
    if text:
        normalized_text = normalize_text(text)
        words = split_into_words(normalized_text)
        word_frequencies = count_word_frequencies(words)
        print_top_words(word_frequencies, 10, 20)

if __name__ == "__main__":
    main()
