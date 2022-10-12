/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const createDevice = /* GraphQL */ `
  mutation CreateDevice(
    $input: CreateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    createDevice(input: $input, condition: $condition) {
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
export const updateDevice = /* GraphQL */ `
  mutation UpdateDevice(
    $input: UpdateDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    updateDevice(input: $input, condition: $condition) {
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
export const deleteDevice = /* GraphQL */ `
  mutation DeleteDevice(
    $input: DeleteDeviceInput!
    $condition: ModelDeviceConditionInput
  ) {
    deleteDevice(input: $input, condition: $condition) {
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
export const createLicence = /* GraphQL */ `
  mutation CreateLicence(
    $input: CreateLicenceInput!
    $condition: ModelLicenceConditionInput
  ) {
    createLicence(input: $input, condition: $condition) {
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
export const updateLicence = /* GraphQL */ `
  mutation UpdateLicence(
    $input: UpdateLicenceInput!
    $condition: ModelLicenceConditionInput
  ) {
    updateLicence(input: $input, condition: $condition) {
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
export const deleteLicence = /* GraphQL */ `
  mutation DeleteLicence(
    $input: DeleteLicenceInput!
    $condition: ModelLicenceConditionInput
  ) {
    deleteLicence(input: $input, condition: $condition) {
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
export const createRoom = /* GraphQL */ `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
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
export const updateRoom = /* GraphQL */ `
  mutation UpdateRoom(
    $input: UpdateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    updateRoom(input: $input, condition: $condition) {
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
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom(
    $input: DeleteRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    deleteRoom(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createReservation = /* GraphQL */ `
  mutation CreateReservation(
    $input: CreateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    createReservation(input: $input, condition: $condition) {
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
export const updateReservation = /* GraphQL */ `
  mutation UpdateReservation(
    $input: UpdateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    updateReservation(input: $input, condition: $condition) {
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
export const deleteReservation = /* GraphQL */ `
  mutation DeleteReservation(
    $input: DeleteReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    deleteReservation(input: $input, condition: $condition) {
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
export const createModifications = /* GraphQL */ `
  mutation CreateModifications(
    $input: CreateModificationsInput!
    $condition: ModelModificationsConditionInput
  ) {
    createModifications(input: $input, condition: $condition) {
      id
      userID
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateModifications = /* GraphQL */ `
  mutation UpdateModifications(
    $input: UpdateModificationsInput!
    $condition: ModelModificationsConditionInput
  ) {
    updateModifications(input: $input, condition: $condition) {
      id
      userID
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteModifications = /* GraphQL */ `
  mutation DeleteModifications(
    $input: DeleteModificationsInput!
    $condition: ModelModificationsConditionInput
  ) {
    deleteModifications(input: $input, condition: $condition) {
      id
      userID
      type
      createdAt
      updatedAt
    }
  }
`;
export const createUnavailableDates = /* GraphQL */ `
  mutation CreateUnavailableDates(
    $input: CreateUnavailableDatesInput!
    $condition: ModelUnavailableDatesConditionInput
  ) {
    createUnavailableDates(input: $input, condition: $condition) {
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
export const updateUnavailableDates = /* GraphQL */ `
  mutation UpdateUnavailableDates(
    $input: UpdateUnavailableDatesInput!
    $condition: ModelUnavailableDatesConditionInput
  ) {
    updateUnavailableDates(input: $input, condition: $condition) {
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
export const deleteUnavailableDates = /* GraphQL */ `
  mutation DeleteUnavailableDates(
    $input: DeleteUnavailableDatesInput!
    $condition: ModelUnavailableDatesConditionInput
  ) {
    deleteUnavailableDates(input: $input, condition: $condition) {
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
export const createNew = /* GraphQL */ `
  mutation CreateNew(
    $input: CreateNewInput!
    $condition: ModelNewConditionInput
  ) {
    createNew(input: $input, condition: $condition) {
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
export const updateNew = /* GraphQL */ `
  mutation UpdateNew(
    $input: UpdateNewInput!
    $condition: ModelNewConditionInput
  ) {
    updateNew(input: $input, condition: $condition) {
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
export const deleteNew = /* GraphQL */ `
  mutation DeleteNew(
    $input: DeleteNewInput!
    $condition: ModelNewConditionInput
  ) {
    deleteNew(input: $input, condition: $condition) {
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
