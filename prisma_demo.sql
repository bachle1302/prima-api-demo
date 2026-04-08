-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 08, 2026 lúc 04:10 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `prisma_demo`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comic`
--

CREATE TABLE `comic` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comic`
--

INSERT INTO `comic` (`id`, `title`, `image`, `createdAt`) VALUES
(1, 'Đấu Phá Thương Khung', 'https://res.cloudinary.com/demo/image/upload/v1/stories/dau-pha.jpg', '2026-04-08 16:32:17.269'),
(2, 'Võ Luyện Đỉnh Phong', 'https://res.cloudinary.com/demo/image/upload/v2/stories/vo-luyen.jpg', '2026-04-08 16:32:17.269'),
(3, 'Toàn Chức Pháp Sư', 'https://res.cloudinary.com/demo/image/upload/v3/stories/toan-chuc.jpg', '2026-04-08 16:32:17.269'),
(4, 'Ta Là Tà Đế', 'https://res.cloudinary.com/demo/image/upload/v4/stories/ta-la-ta-de.jpg', '2026-04-08 16:32:17.269'),
(5, 'Tiên Nghịch', 'https://res.cloudinary.com/demo/image/upload/v5/stories/tien-nghich.jpg', '2026-04-08 16:32:17.269');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `id` int(11) NOT NULL,
  `token` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `ip` varchar(191) DEFAULT NULL,
  `userAgent` varchar(191) DEFAULT NULL,
  `expiresAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `refreshtoken`
--

INSERT INTO `refreshtoken` (`id`, `token`, `userId`, `createdAt`, `ip`, `userAgent`, `expiresAt`) VALUES
(95, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NDg3MDU0LCJleHAiOjE3NzYwOTE4NTR9.iASuFDnLwp6tsPa8accFNKNrl4fDtSxWOFTkCnS0dk4', 5, '2026-04-06 14:50:54.345', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-13 14:50:54.340'),
(101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NDg3NTIwLCJleHAiOjE3NzYwOTIzMjB9.IJGKw9KuVWgdInGZ7pR17kXpCeop6FU0OZe--ZAHDpU', 5, '2026-04-06 14:58:40.865', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-13 14:58:40.864'),
(104, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTQ1Mzk3LCJleHAiOjE3NzYxNTAxOTd9.ld-gw-Umok6G3u58xAgnpjdtg1y1BrpNYJKQui_Lrzo', 5, '2026-04-07 07:03:17.027', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 07:03:17.026'),
(107, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTQ3Mjk3LCJleHAiOjE3NzYxNTIwOTd9.bhdwjg6DnjLXuwn0iYjNUornk1t6HzvhktgreUBQ9CI', 5, '2026-04-07 07:34:57.073', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 07:34:57.072'),
(109, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTQ3NDM4LCJleHAiOjE3NzYxNTIyMzh9.7bUtBlQDp-b8j3c8ZrkRmBnizxTaYZLUNsMf9pio5zU', 5, '2026-04-07 07:37:18.950', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 07:37:18.948'),
(115, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTQ4NDY2LCJleHAiOjE3NzYxNTMyNjZ9.qcbTyDcScfTnY0s7-dh_9qb03RuL8IQfsojWWzMjRQk', 5, '2026-04-07 07:54:26.333', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 07:54:26.332'),
(116, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTYwMjc2LCJleHAiOjE3NzYxNjUwNzZ9.gPvOn_bU9BbkmiKpnHto-07M6tKH4AOMOxZVzRSkfHQ', 5, '2026-04-07 11:11:16.074', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 11:11:16.072'),
(117, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTYwMzUwLCJleHAiOjE3NzYxNjUxNTB9.NzB8-TiCaXRNpXV7boQTbnzWrZBCYBql-YPfYDWJDus', 5, '2026-04-07 11:12:30.555', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 11:12:30.554'),
(118, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTYwNDc2LCJleHAiOjE3NzYxNjUyNzZ9.AkLg2NY4R_BFE-Ibl2CUuJA-SX_YOp8V4hAj3wlzSgI', 5, '2026-04-07 11:14:36.184', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 11:14:36.182'),
(119, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTYwNDk1LCJleHAiOjE3NzYxNjUyOTV9.GtyLhZl7Q4_YsIGvXT6Byd6e8ROlZ3p-hH5XgYJF2Qs', 5, '2026-04-07 11:14:55.371', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 11:14:55.370'),
(120, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTYwNzI2LCJleHAiOjE3NzYxNjU1MjZ9.eAOxGiraplu7j2nzVHc4qou8Yix-nozO4AKDNmLvBQM', 5, '2026-04-07 11:18:46.821', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 11:18:46.820'),
(121, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTYwODc2LCJleHAiOjE3NzYxNjU2NzZ9.KuzbkhCCDL0JXG787icbk1pJBo-_q1MmrG5Xv53JC9s', 5, '2026-04-07 11:21:16.542', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 11:21:16.540'),
(122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTYxMDE3LCJleHAiOjE3NzYxNjU4MTd9.apozhXLj68rc6t0uviRn0W9sF_Jn7ZdkjhyWEzSFF-o', 5, '2026-04-07 11:23:37.084', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 11:23:37.083'),
(123, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NTYxMDk2LCJleHAiOjE3NzYxNjU4OTZ9.yV4T5eWmlsDGnfRCwa62Zz8foD5tYJ9K0d520UDqOCQ', 5, '2026-04-07 11:24:56.972', '::ffff:127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-14 11:24:56.971'),
(151, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc1NjQ5MDg0LCJleHAiOjE3NzYyNTM4ODR9.W9TUSqUCbiQ3boRiaHCVpqShNXiQaSmVJ3JGAwKe9-c', 4, '2026-04-08 11:51:24.794', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0', '2026-04-15 11:51:24.793');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `createdAt`, `role`) VALUES
(4, 'admin123@gmail.com', '$2b$10$Sqc7oDrBDiygSJnElMa.pOMOhiyRo1hh6OX6FUdyYWqMKBKYa/W9W', '2026-03-25 18:40:35.444', 'USER'),
(5, 'admin@gmail.com', '$2b$10$4VsHAjXRD8qWGRVediSpGOW1PMe/VnX4Qi3PtRWdb.PmNi5av.HEK', '2026-04-02 08:47:27.026', 'USER');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0558a054-a6cc-4f87-b950-a475044efcd1', 'd53d3fba639bcdc978d7b146b0679e4e387f5d2b111caf50ceec36d5767b4604', '2026-03-25 18:27:51.014', '20260325090905_add_role', NULL, NULL, '2026-03-25 18:27:51.004', 1),
('0f478175-3752-4d24-b645-e32a6b527cea', '5b6bfb5688565d6b92a9d8b60e139ec48e283bb2ec2fe065fe3f6610fedbb70d', '2026-04-02 07:28:15.643', '20260402072815_add_expires_at', NULL, NULL, '2026-04-02 07:28:15.631', 1),
('2ea06d6f-42c5-47f6-8437-182413eeb7f1', '3321a66cbb0e3c2a8e50dd2081139bdb29ae37fa9d1684cb3ffeea6dabda2ef8', '2026-04-06 16:19:30.349', '20260406161930_add_comic', NULL, NULL, '2026-04-06 16:19:30.339', 1),
('5fa30e5b-b3f0-428a-9c53-ca3287b26a74', 'caf54d9389f46eaa557df7011137e2fb3cbb10bcb5513c572fd9bbfb24124ead', '2026-04-02 07:19:30.811', '20260402071930_add_device_info', NULL, NULL, '2026-04-02 07:19:30.802', 1),
('a5f045a1-e848-4bf0-a090-ef6b12ba8ff3', 'b02b8e431c681e7a56eac7156162bf2653076cfafa311b54c14a6980fd9fb80e', '2026-03-25 18:27:50.901', '20260203152644_add_refresh_token', NULL, NULL, '2026-03-25 18:27:50.890', 1),
('b64181a1-0ddd-4758-8149-73777759c543', 'd2864d5ecddcd345b85dfaac87e50997da2b8894e6b6501dbdca4f1da5e9bc01', '2026-03-25 18:27:50.888', '20260129201642_init', NULL, NULL, '2026-03-25 18:27:50.853', 1),
('ba71f831-a8ea-4b25-97b3-397de3f2ec17', '06d3cf422ec1f04b2d8c7e2201d1cf450cd1443918473744632a80cbbdbd7608', '2026-03-25 18:27:51.002', '20260204194113_add_refresh_token', NULL, NULL, '2026-03-25 18:27:50.903', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `comic`
--
ALTER TABLE `comic`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `RefreshToken_token_key` (`token`),
  ADD KEY `RefreshToken_userId_fkey` (`userId`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Chỉ mục cho bảng `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `comic`
--
ALTER TABLE `comic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
