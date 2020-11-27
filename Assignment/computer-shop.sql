-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2020 at 06:44 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agro-glow`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `catName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `catName`) VALUES
(8, 'Monitor'),
(9, 'Graphics Card'),
(10, 'SSD'),
(11, 'Proccessor'),
(17, 'Casing');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `notificationType` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userType` varchar(100) NOT NULL,
  `approval` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `description`, `notificationType`, `name`, `userType`, `approval`) VALUES
(13, 'I Want To Leave This System', 'leaveManager', 'arefin101', 'manager', 'pending'),
(14, 'I need More Products', 'leaveManager', 'arefin101', 'manager', 'pending'),
(15, 'I Want T Leave', 'Leave Seller', 'Samman', 'seller', 'pending'),
(16, 'We Need This More', 'More Product', 'Farmer1', 'farmer', 'pending'),
(17, 'I want To Leave This System', 'leaveManager', 'arefin101', 'manager', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `productName` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `quantity` int(50) NOT NULL,
  `expDate` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `imageURL` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `productName`, `category`, `price`, `quantity`, `expDate`, `description`, `imageURL`) VALUES
(39, 'Xiaomi Mi 1C 23.8 Inch Full HD IPS', 'Monitor', '12,500', 17, '2nd july 2022', 'Model: Mi 1C\r\n23.8\" (1920x1080) FHD IPS Display\r\nResponse Time: 6ms\r\nRefresh Rate: 60Hz\r\nPorts & Slots: VGA and HDMI', 'moni1.jpeg'),
(40, 'Adata 240GB External SSD  ', 'Monitor', '4800', 30, '3rd January 2021', 'Model: Adata\r\nCapacity 240GB\r\nInterface USB 3.2\r\nColor Black', 'ssd1.jpg'),
(41, 'Lexar NM100 128GB M.2 2280', 'Monitor', '2100', 32, '18th june 2022', 'Model: NM100\r\nFaster Startup, Energy Efficient & Easy Set up\r\nForm Factor: M.2 2280\r\nInterface: SATA III (6Gb/s)\r\nShock and Vibration Resistant', 'ssd2.jpg'),
(42, 'ASUS ROG Strix NVIDIA GeForce', 'Monitor', '198,000', 5, '18th june 2022', 'Model: ROG Strix NVIDIA GeForce RTX 3090 OC Edition\r\nNVIDIA Ampere Streaming Multiprocessors\r\n2nd Gen RT Cores & 3rd Gen Tensor Cores\r\nAxial-tech Fan Design, 2.9-slot\r\nSuper Alloy Power II, GPU Tweak II', 'gpu1.jpg'),
(43, 'AMD Ryzen 3 1300X Processor', 'Proccessor', '7200', 6, '18th june 2022', 'Model: AMD Ryzen 3 1300X Processor\r\nSpeed: 3.5GHz up to 3.7GHz\r\nCache (L2+L3): 10 MB\r\nCores-4 & Threads-4\r\nMemory Speed: 2667MHz', 'pro1.jpg'),
(45, 'Mid Tower Gaming Case', 'Casing', '8,500', 4, '18th june 2022', 'Model: LANCOOL II\r\nRemovable Two-way Cable Management Bar\r\nExquisite Steel Craftsmanship\r\nCable management at ease\r\nFlip panels & shrouds all around', 'cas1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `DOB` varchar(100) NOT NULL,
  `mobileNo` varchar(100) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userType` varchar(100) NOT NULL DEFAULT 'user',
  `validity` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `DOB`, `mobileNo`, `userName`, `password`, `userType`, `validity`) VALUES
(1, 'Md. Shamsul Arefin Khan', 'arerfink910@yahoo.com', '15th April 1997', '01829747029', 'arefin101', '1234', 'manager', 'valid'),
(21, 'sani', 'sani@gmail.com', '12th june 1998', '01982735463', 'sani101', '1234', 'moderator', 'valid');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`email`),
  ADD UNIQUE KEY `UserName` (`userName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
