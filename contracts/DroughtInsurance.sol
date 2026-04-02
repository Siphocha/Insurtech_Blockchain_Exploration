//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//THis is the first type of prorotype MVP-ish for an insurance guarnateer and payout mechanism.
contract DroughtInsurance {
    address public insurer;
    address public farmer;
    address public oracle;
    
    uint256 public payoutAmount;
    uint256 public rainfallThreshold; // e.g., in millimeters
    bool public policyActive;

    event PolicyFunded(uint256 amount);
    event WeatherUpdate(uint256 rainfallAmount);
    event PayoutTriggered(address farmer, uint256 amount);
    event PolicyCancelled(address insurer, uint256 returnedAmount);

    modifier onlyInsurer() {
        require(msg.sender == insurer, "Insurer solely can do this action");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "THisis a beta so the Oracle (user input) is the only one who can");
        _;
    }

    constructor(
        address _farmer, 
        address _oracle, 
        uint256 _rainfallThreshold, 
        uint256 _payoutAmount
    ) {
        insurer = msg.sender;
        farmer = _farmer;
        oracle = _oracle;
        rainfallThreshold = _rainfallThreshold;
        payoutAmount = _payoutAmount;
        policyActive = true;//cause we testing and don't want it closed off. KEEP AT TRUE UNTIL BETA TESTING DONE!
    }

    //The fund policy governing the payout mechanism.
    function fundPolicy() external payable onlyInsurer {
        require(msg.value == payoutAmount, "Funding exact payout amount");
        policyActive = true;
        emit PolicyFunded(msg.value);
    }

    //function for consistent weather reporting (in this case the users data)
    function reportWeather(uint256 _currentRainfall) external onlyOracle {
        require(policyActive, "Policy is not active or already paid out");
        emit WeatherUpdate(_currentRainfall);

        if (_currentRainfall < rainfallThreshold) {
            // Drought condition met! Trigger automatic payout!
            policyActive = false;
            
            (bool success, ) = farmer.call{value: address(this).balance}("");
            require(success, "Payout transfer failed");
            
            emit PayoutTriggered(farmer, payoutAmount);
        }
    }

    function endSeason() external onlyInsurer {
        require(policyActive, "Policy inactive");
        policyActive = false;
        
        uint256 balance = address(this).balance;
        (bool success, ) = insurer.call{value: balance}("");
        require(success, "Withdrawal failed");
        
        emit PolicyCancelled(insurer, balance);
    }
}