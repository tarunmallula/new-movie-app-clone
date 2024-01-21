import React from 'react'

const MovieContext = React.createContext({
  username: '',
  password: '',
  searchInput: '',
  updateUsername: () => {},
  updatePassword: () => {},
  updateSearchInput: () => {},
  onChangeLogout: () => {},
})
export default MovieContext
