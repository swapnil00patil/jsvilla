-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 15, 2018 at 09:52 AM
-- Server version: 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `jsvilla`
--

-- --------------------------------------------------------

--
-- Table structure for table `js_authors`
--

CREATE TABLE `js_authors` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `js_authors`
--

INSERT INTO `js_authors` (`id`, `name`) VALUES
(1, 'ss'),
(2, ''),
(3, ''),
(4, ''),
(5, 'asd'),
(6, 'df');

-- --------------------------------------------------------

--
-- Table structure for table `js_post_comments`
--

CREATE TABLE `js_post_comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `parent` int(11) NOT NULL DEFAULT '0',
  `text` longtext NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `js_post_tags`
--

CREATE TABLE `js_post_tags` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `js_post_tags`
--

INSERT INTO `js_post_tags` (`id`, `post_id`, `tag_id`) VALUES
(1, 1, 1),
(2, 6, 2),
(3, 6, 1),
(4, 7, 2),
(5, 10, 1),
(6, 12, 1),
(7, 14, 1);

-- --------------------------------------------------------

--
-- Table structure for table `js_tags`
--

CREATE TABLE `js_tags` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `js_tags`
--

INSERT INTO `js_tags` (`id`, `title`) VALUES
(1, 'angular'),
(2, 'react');

-- --------------------------------------------------------

--
-- Table structure for table `js_users`
--

CREATE TABLE `js_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registered` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `wall_setting` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `js_wall_posts`
--

CREATE TABLE `js_wall_posts` (
  `id` int(11) NOT NULL,
  `url` text NOT NULL,
  `title` text NOT NULL,
  `description` longtext NOT NULL,
  `demo_url` text NOT NULL,
  `image_url` text NOT NULL,
  `author_id` int(11) NOT NULL,
  `posted_date` datetime NOT NULL,
  `viewed` int(11) NOT NULL,
  `level` enum('b','e') NOT NULL,
  `created_by` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `updated_by` int(11) NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `js_wall_posts`
--

INSERT INTO `js_wall_posts` (`id`, `url`, `title`, `description`, `demo_url`, `image_url`, `author_id`, `posted_date`, `viewed`, `level`, `created_by`, `created`, `updated_by`, `updated`) VALUES
(1, 'https://blog.angular.io/the-state-of-css-in-angular-4a52d4bd2700', 'The State of CSS in Angular', 'Global CSS — The Way You’re Used To\r\nComponent-Scoped CSS\r\nThree Modes of Component Encapsulation\r\nDeep CSS ::ng-deep', '', '', 0, '0000-00-00 00:00:00', 0, 'e', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(2, 'asd', 'asdasd', 'asd', '', '', 0, '2018-02-06 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(3, 'asd', 'asdasd', 'asd', '', '', 0, '0000-00-00 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(4, 'asd', 'asdasd', 'ddd', '', '', 0, '0000-00-00 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(5, 'sdf', 'sadasd', 'asdasd', '', '', 0, '0000-00-00 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(6, 'swap', 'swap', 'swap', '', '', 0, '0000-00-00 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(7, 'sss', 'sss', 'sss', '', '', 0, '0000-00-00 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(8, 'ss', 'ss', 'ss', '', '', 0, '0000-00-00 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(9, 'asd', 'asd', 'asd', '', '', 0, '0000-00-00 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(10, 'ss', 'sss', 'ss', '', '', 0, '0000-00-00 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(11, 'asd', 'asdasd', 'asd', '', '', 1, '0000-00-00 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(12, 'sdjh', 'jksd', 'dsjh', '', '', 1, '0000-00-00 00:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(13, 'sdf', 'sdf', 'sdf', '', '', 1, '2014-10-12 12:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(14, 'asd', 'sdasd', '<a href=\"https://www.w3schools.com\">Visit W3Schools.com!</a>\n\n<a href=\"https://www.w3schools.com\">Visit W3Schools.com!</a>', '', '', 5, '2014-02-03 12:00:00', 0, 'b', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `js_authors`
--
ALTER TABLE `js_authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `js_post_comments`
--
ALTER TABLE `js_post_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `js_post_tags`
--
ALTER TABLE `js_post_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `js_tags`
--
ALTER TABLE `js_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `js_users`
--
ALTER TABLE `js_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `js_wall_posts`
--
ALTER TABLE `js_wall_posts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `js_authors`
--
ALTER TABLE `js_authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `js_post_comments`
--
ALTER TABLE `js_post_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `js_post_tags`
--
ALTER TABLE `js_post_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `js_tags`
--
ALTER TABLE `js_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `js_users`
--
ALTER TABLE `js_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `js_wall_posts`
--
ALTER TABLE `js_wall_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;