import type { DataBoundConfig } from "src/lib/data-bound/lib/types";

export const SampleConfig: DataBoundConfig = {
    "layouts": {
        "main": {
            "type": "section",
            "header": "Frame",
            "sections": [
                {
                    "type": "section",
                    "header": "section",
                    "direction": "top-bottom",
                    "sections": [
                        {
                            "type": "section",
                            "header": "section",
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
                            "type": "section",
                            "header": "section",
                            "direction": "left-right",
                            "bind": "$.personal",
                            "sections": [
                                {
                                    "type": "input",
                                    "header": "First Name",
                                    "bind": "$.firstName",
                                    "component": {
                                        "type": "text"
                                    }
                                },
                                {
                                    "type": "input",
                                    "header": "First Name",
                                    "bind": "$.firstName",
                                    "component": {
                                        "type": "text"
                                    }
                                },
                                {
                                    "type": "input",
                                    "header": "Last Name",
                                    "bind": "$.lastName",
                                    "component": {
                                        "type": "text"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "section",
                            "header": "section",
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
                            "type": "section",
                            "header": "section",
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
                            "type": "list",
                            "header": "Contacts",
                            "bind": "$.contact",
                            "direction": "top-bottom",
                            "container": {
                                "type": "tabbed",
                                "direction":"left-right"
                            },
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