/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDevice = /* GraphQL */ `
  query GetDevice($id: ID!) {
    getDevice(id: $id) {
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
export const listDevices = /* GraphQL */ `
  query ListDevices(
    $filter: ModelDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getLicence = /* GraphQL */ `
  query GetLicence($id: ID!) {
    getLicence(id: $id) {
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
export const listLicences = /* GraphQL */ `
  query ListLicences(
    $filter: ModelLicenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLicences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
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
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getReservation = /* GraphQL */ `
  query GetReservation($id: ID!) {
    getReservation(id: $id) {
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
export const listReservations = /* GraphQL */ `
  query ListReservations(
    $filter: ModelReservationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getModifications = /* GraphQL */ `
  query GetModifications($id: ID!) {
    getModifications(id: $id) {
      id
      userID
      type
      createdAt
      updatedAt
    }
  }
`;
export const listModifications = /* GraphQL */ `
  query ListModifications(
    $filter: ModelModificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUnavailableDates = /* GraphQL */ `
  query GetUnavailableDates($id: ID!) {
    getUnavailableDates(id: $id) {
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
export const listUnavailableDates = /* GraphQL */ `
  query ListUnavailableDates(
    $filter: ModelUnavailableDatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnavailableDates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        deviceID
        licenceID
        roomID
        dates
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNew = /* GraphQL */ `
  query GetNew($id: ID!) {
    getNew(id: $id) {
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
export const listNews = /* GraphQL */ `
  query ListNews(
    $filter: ModelNewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        date_published
        image
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
