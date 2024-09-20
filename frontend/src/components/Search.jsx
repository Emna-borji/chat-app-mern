import { MDBIcon, MDBInputGroup } from 'mdb-react-ui-kit'
import React from 'react'

const Search = () => {
  return (
    <MDBInputGroup className="rounded mb-3">
                      <input
                        className="form-control rounded"
                        placeholder="Search"
                        type="search"
                      />
                      <span
                        className="input-group-text border-0"
                        id="search-addon"
                      >
                        <MDBIcon fas icon="search" />
                      </span>
    </MDBInputGroup>
  )
}

export default Search