# Data Bound

# Notes

### Directives
Directives are cascading that drive component behavior 
- hide
- lock

### Events

- change (Not to be confused with data changes that are monitored actively)


### Elements

| type      | data | layouts | events | directives |
| --------- | ---- | ------- | ------ | ---------- |
| workspace | many | many    | no     | no         |
| container | one  | many    | no     | yes        |
| list      | many | one     | no     | yes        |
| output    | one  | one     | no     | yes        |
| input     | one  | one     | yes    | yes        |
 
 Copyright 2024 Eduardo Covarrubias. All rights reserved.
