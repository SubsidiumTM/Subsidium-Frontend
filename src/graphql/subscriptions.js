/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote {
    onUpdateNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote {
    onDeleteNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice {
    onCreateDevice {
      id
      name
      portable
      os
      processor
      storage
      ram
      description
      images
      active
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDevice = /* GraphQL */ `
  subscription OnUpdateDevice {
    onUpdateDevice {
      id
      name
      portable
      os
      processor
      storage
      ram
      description
      images
      active
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDevice = /* GraphQL */ `
  subscription OnDeleteDevice {
    onDeleteDevice {
      id
      name
      portable
      os
      processor
      storage
      ram
      description
      images
      active
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLicence = /* GraphQL */ `
  subscription OnCreateLicence {
    onCreateLicence {
      id
      name
      year
      compatibility
      category
      description
      images
      active
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLicence = /* GraphQL */ `
  subscription OnUpdateLicence {
    onUpdateLicence {
      id
      name
      year
      compatibility
      category
      description
      images
      active
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLicence = /* GraphQL */ `
  subscription OnDeleteLicence {
    onDeleteLicence {
      id
      name
      year
      compatibility
      category
      description
      images
      active
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
      id
      name
      building
      floor
      proyector
      wifi
      board
      air_conditioner
      ethernet
      computers
      double_monitor
      seats
      energy_outlets
      description
      images
      active
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom {
    onUpdateRoom {
      id
      name
      building
      floor
      proyector
      wifi
      board
      air_conditioner
      ethernet
      computers
      double_monitor
      seats
      energy_outlets
      description
      images
      active
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom {
    onDeleteRoom {
      id
      name
      building
      floor
      proyector
      wifi
      board
      air_conditioner
      ethernet
      computers
      double_monitor
      seats
      energy_outlets
      description
      images
      active
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      name
      surname
      email
      type
      verified
      active
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      name
      surname
      email
      type
      verified
      active
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      name
      surname
      email
      type
      verified
      active
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReservation = /* GraphQL */ `
  subscription OnCreateReservation {
    onCreateReservation {
      id
      userID
      deviceID
      licenceID
      roomID
      reservationDate
      reservationTime
      reservationDuration
      state
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReservation = /* GraphQL */ `
  subscription OnUpdateReservation {
    onUpdateReservation {
      id
      userID
      deviceID
      licenceID
      roomID
      reservationDate
      reservationTime
      reservationDuration
      state
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReservation = /* GraphQL */ `
  subscription OnDeleteReservation {
    onDeleteReservation {
      id
      userID
      deviceID
      licenceID
      roomID
      reservationDate
      reservationTime
      reservationDuration
      state
      createdAt
      updatedAt
    }
  }
`;
export const onCreateModifications = /* GraphQL */ `
  subscription OnCreateModifications {
    onCreateModifications {
      id
      userID
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateModifications = /* GraphQL */ `
  subscription OnUpdateModifications {
    onUpdateModifications {
      id
      userID
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteModifications = /* GraphQL */ `
  subscription OnDeleteModifications {
    onDeleteModifications {
      id
      userID
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUnavailableDates = /* GraphQL */ `
  subscription OnCreateUnavailableDates {
    onCreateUnavailableDates {
      deviceID
      licenceID
      roomID
      dates
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUnavailableDates = /* GraphQL */ `
  subscription OnUpdateUnavailableDates {
    onUpdateUnavailableDates {
      deviceID
      licenceID
      roomID
      dates
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUnavailableDates = /* GraphQL */ `
  subscription OnDeleteUnavailableDates {
    onDeleteUnavailableDates {
      deviceID
      licenceID
      roomID
      dates
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNew = /* GraphQL */ `
  subscription OnCreateNew {
    onCreateNew {
      id
      title
      description
      date_published
      image
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNew = /* GraphQL */ `
  subscription OnUpdateNew {
    onUpdateNew {
      id
      title
      description
      date_published
      image
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNew = /* GraphQL */ `
  subscription OnDeleteNew {
    onDeleteNew {
      id
      title
      description
      date_published
      image
      content
      createdAt
      updatedAt
    }
  }
`;
