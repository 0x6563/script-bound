import type { DataBoundConfig } from "src/lib/data-bound/lib/types";

export const SampleConfig: DataBoundConfig = {
    "layouts": {
        "main": {
            "type": "section",
            "header": "Frame",
            "sections": [
                {
                    "header": "section",
                    "type": "section",
                    "direction": "top-bottom",
                    "sections": [
                        {
                            "header": "section",
                            "type": "section",
                            "direction": "left-right",
                            "bind": "$.personal",
                            "sections": [
                                {
                                    "header": "Path",
                                    "type": "input",
                                    "bind": "@path",
                                    "component": {
                                        "type": "text"
                                    }
                                }
                            ]
                        },
                        {
                            "header": "section",
                            "type": "section",
                            "direction": "left-right",
                            "bind": "$.personal",
                            "sections": [
                                {
                                    "header": "First Name",
                                    "type": "input",
                                    "bind": "$.firstName",
                                    "component": {
                                        "type": "text"
                                    }
                                },
                                {
                                    "header": "First Name",
                                    "type": "input",
                                    "bind": "$.firstName",
                                    "component": {
                                        "type": "text"
                                    }
                                },
                                {
                                    "header": "Last Name",
                                    "type": "input",
                                    "bind": "$.lastName",
                                    "component": {
                                        "type": "text"
                                    }
                                }
                            ]
                        },
                        {
                            "header": "section",
                            "type": "section",
                            "direction": "top-bottom",
                            "sections": [
                                {
                                    "header": "Address",
                                    "type": "input",
                                    "bind": "$.personal.address",
                                    "component": {
                                        "type": "text"
                                    }
                                }
                            ]
                        },
                        {
                            "header": "section",
                            "type": "section",
                            "direction": "left-right",
                            "sections": [
                                {
                                    "header": "City",
                                    "type": "input",
                                    "bind": "$.personal.city",
                                    "component": {
                                        "type": "text"
                                    }
                                },
                                {
                                    "header": "State",
                                    "type": "input",
                                    "bind": "$.personal.state",
                                    "component": {
                                        "type": "text"
                                    }
                                },
                                {
                                    "header": "Zip",
                                    "type": "input",
                                    "bind": "$.personal.zip",
                                    "component": {
                                        "type": "text"
                                    }
                                }
                            ]
                        },
                        {
                            "header": "Contacts",
                            "type": "list",
                            "bind": "$.contact",
                            "direction": "top-bottom",
                            "section": {
                                "type": "section",
                                "sections": [
                                    {
                                        "header": "Path",
                                        "type": "input",
                                        "bind": "@path",
                                        "component": {
                                            "type": "text"
                                        }
                                    },
                                    {
                                        "type": "input",
                                        "bind": "$.type",
                                        "component": {
                                            "type": "text"
                                        }
                                    },
                                    {
                                        "type": "input",
                                        "bind": "$.phoneNumber",
                                        "component": {
                                            "type": "text"
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
};

export const SampleData: any = {
    personal: {
        firstName: 'Jane',
        lastName: 'Doe',
        address: '',
        city: '',
        state: '',
        zip: ''
    },
    contact: [
        {
            type: "home",
            phoneNumber: "555-555-0000"
        },
        {
            type: "cell",
            phoneNumber: "555-555-1111"
        },
        {
            type: "cell",
            phoneNumber: "555-555-2222"
        }
    ]
}

export const SampleCSS =
    `input {
    color:red; 
    border: none;
    border-bottom: 2px solid black;
}

input:focus {
    outline: none;
    border-bottom: 2px solid blue;
}

[data-element="content"] {
    border: solid 1px #bbb;
    padding: 8px !important;
}
`;