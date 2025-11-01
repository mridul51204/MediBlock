// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecord {
    struct Record {
        string ipfsHash;
        address uploadedBy;
        uint256 timestamp;
    }

    mapping(address => Record[]) private records;
    mapping(address => bool) private authorizedDoctors;

    event RecordUploaded(address indexed patient, string ipfsHash, uint256 timestamp);
    event DoctorAuthorized(address indexed doctor);
    event DoctorRevoked(address indexed doctor);

    modifier onlyDoctor() {
        require(authorizedDoctors[msg.sender], "Not an authorized doctor");
        _;
    }

    function authorizeDoctor(address _doctor) public {
        authorizedDoctors[_doctor] = true;
        emit DoctorAuthorized(_doctor);
    }

    function revokeDoctor(address _doctor) public {
        authorizedDoctors[_doctor] = false;
        emit DoctorRevoked(_doctor);
    }

    function uploadRecord(string memory _ipfsHash) public {
        records[msg.sender].push(Record(_ipfsHash, msg.sender, block.timestamp));
        emit RecordUploaded(msg.sender, _ipfsHash, block.timestamp);
    }

    function getRecords(address _patient) public view onlyDoctor returns (Record[] memory) {
        return records[_patient];
    }
}
