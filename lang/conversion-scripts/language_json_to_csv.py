#!/usr/bin/env python3

import json
import os



def read_json(path_to_json):
    """ Read a .json file and return a nested Python dictionary that represents the read .json file.
    Input:
        * path_to_json: <str> path to the .json file to read.

    Returns:
        * json_dict: <dict> nested Python dictionary that represents read .json file.

    """
    with open(path_to_json, mode = "r") as f:
        json_dict = json.load(f)
        return json_dict


def write_json_dict_to_csv(json_dict, f, trailing_key="", key_separator = "|", key_value_separator = ";"):
    """ Write a .csv file that corresponds to a nested Python dictionary that represents
        a .json file (e.g. obtained from the <read_json> function).

        Example:
        #########
        input .json nested Python dict:
        #################################
        {"cat1":
            {
                "cat1.1": "loc1.1",
                "cat1.2": "loc1.2"
            },
        "cat2":
            {
                "cat2.1":
                    {
                        "cat2.1.1": "loc2.1.1"}
                    }
        }

        ==>
        writes the following .csv file:
        ################################
        cat1|cat1.1,loc1.1
        cat1|cat1.2,loc1.2
        cat2|cat2.1|cat2.1.1,loc2.1.1


        Input:
            * json_dict:
            * f: stream object to write to
            * trailing_key = key to use for
            *
        Returns:
            * None

    """

    for key in json_dict.keys():
        new_trailing_key = trailing_key + key_separator + key if trailing_key!="" else key

        if isinstance(json_dict[key], dict):
            write_json_dict_to_csv(json_dict[key], f, trailing_key = new_trailing_key, key_separator = key_separator)
        # value found!
        else:
            value = json_dict[key]
            # escape newline symbols
            value = value.replace("\n", "\\n")
            key = new_trailing_key
            # write line to file
            f.write(key+key_value_separator+str(value)+"\n")


def main():
    # iterate over all .json files
    directory = "../" # relative path to "./lang/"

    for file in os.listdir(directory):
        filename, fileext = os.path.splitext(file)
        if fileext == ".json":
            language_key = filename
            path_to_json = os.path.join(directory,file)
            path_to_csv = os.path.join(directory, "localization-tables/{}.csv".format(language_key))
            print("Convert {} to {}".format(path_to_json, path_to_csv))
            # Write a into a file <language_key>+.csv
            with open(path_to_csv, mode = "w") as f:
                json_dict = read_json(os.path.join(directory,file))
                write_json_dict_to_csv(json_dict, f)

        else:
            continue







if __name__ == "__main__":
    main()
