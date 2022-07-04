#!/usr/bin/env python3

import json, os

def add_nested_entry_to_dict(nested_dict_entry, dic):
    """ Add a nested dictionary entry to a netsted dic.
    CAVEAT This will overwrite entries in the netsted dic if there is a key collision!

    E.g.
        add_nested_entry_to_dict({'a': {'b': {'c': 'textD'}}, {'a': {'b': {'c': 'textC'}})
    will return
        {'a': {'b': {'c': 'textD'}}
    and not
        {'a': {'b': {'c': 'textC'}}

    """
    # nested_dict_entry only has a single key-value pair
    nested_dict_entry_key = list(nested_dict_entry.keys())[0]
    if (nested_dict_entry_key in dic.keys() ) & (isinstance(nested_dict_entry[nested_dict_entry_key], dict)):
        return add_nested_entry_to_dict(nested_dict_entry[nested_dict_entry_key], dic[nested_dict_entry_key])
    else:
        dic.update(nested_dict_entry)
        return


def line_to_nested_dict_entry(line):
    """
    Example:
        line = "a|b|c;text" -> {"a": {"b":{ "c" : text}}}

    """
    # extract the key sequence (e.g. "a|b|c" -> ["a", "b", "c"])
    key_sequence = line.split(";")[0].split("|")
    # extract text ()
    text = [line.split(";")[1]]
    # add key_sequence and text lists into
    string_list = key_sequence+text
    # make nested dict entry
    nested_dict_entry = make_nested_dict(string_list)

    return nested_dict_entry


def make_nested_dict(string_list):
    """
    Input:
        * ['a', 'b', 'c']
    Returns:
        * {'a': {'b' : 'c'}}

    """
    if len(string_list) >1:
        key = string_list[0]
        return {key: make_nested_dict(string_list[1:])}
    else:
        return string_list[0]





def main():
    # iterate over all .csv files
    directory = "../localization-tables" # relative path to "./lang/"

    for file in os.listdir(directory):
        filename, fileext = os.path.splitext(file)
        if fileext == ".csv":
            language_key = filename

            csv_output_path = os.path.join(directory,file)
            json_output_path = os.path.join("../",language_key + ".json")

            print("Convert {} to {}".format(csv_output_path, json_output_path))

            # initialize output json_dict
            json_dict = {}

            # read the .csv file line by line
            with open(csv_output_path, mode="r") as f:
                for line in f:
                    # drop newlines
                    line = line.replace("\n","")
                    # extract nested_dict_entry from line in the .csv file
                    nested_dict_entry = line_to_nested_dict_entry(line)
                    # add nested_dict_entry to json_dict
                    add_nested_entry_to_dict(nested_dict_entry, json_dict)


            # Write json_dict to json_output_path
            with open(json_output_path, mode = "w") as f:
                json.dump(json_dict, f, indent=4)

        else:
            continue



if __name__ == "__main__":
    main()
