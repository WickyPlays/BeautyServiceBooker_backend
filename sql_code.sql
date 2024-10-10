CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    loginMethod ENUM('email', 'social', 'phone') NOT NULL
);

CREATE TABLE Locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    type ENUM('men', 'women', 'both') NOT NULL
);

CREATE TABLE PromoCodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    locationID INT NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    percentage DECIMAL(5,2) NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (locationID) REFERENCES Locations(id)
);

CREATE TABLE Services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    locationID INT NOT NULL,
    type ENUM('barber', 'facial', 'massage', 'hair care') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration INT NOT NULL,  -- Duration in seconds
    FOREIGN KEY (locationID) REFERENCES Locations(id)
);

CREATE TABLE Bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    locationID INT NOT NULL,
    promoID INT,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users(id),
    FOREIGN KEY (locationID) REFERENCES Locations(id),
    FOREIGN KEY (promoID) REFERENCES PromoCodes(id)
);

CREATE TABLE BillServices (
    billID INT NOT NULL,
    serviceID INT NOT NULL,
    FOREIGN KEY (billID) REFERENCES Bills(id),
    FOREIGN KEY (serviceID) REFERENCES Services(id),
    PRIMARY KEY (billID, serviceID)
);
