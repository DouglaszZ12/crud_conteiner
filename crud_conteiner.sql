-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25-Fev-2023 às 08:29
-- Versão do servidor: 10.4.25-MariaDB
-- versão do PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `crud_conteiner`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `conteiner`
--

CREATE TABLE `conteiner` (
  `id` int(11) NOT NULL,
  `client` varchar(140) DEFAULT NULL,
  `numb` char(11) DEFAULT NULL,
  `type` char(2) DEFAULT NULL,
  `status` char(5) DEFAULT NULL,
  `category` char(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `conteiner`
--

INSERT INTO `conteiner` (`id`, `client`, `numb`, `type`, `status`, `category`) VALUES
(1, 'Teste 1 - edição', 'abcd7645123', '40', 'Vazio', 'Exportação'),
(5, 'Teste 2', 'bbbb1234567', '', '', 'Importação');

-- --------------------------------------------------------

--
-- Estrutura da tabela `movement`
--

CREATE TABLE `movement` (
  `id` int(11) NOT NULL,
  `id_given` int(11) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `movement`
--

INSERT INTO `movement` (`id`, `id_given`, `type`, `start`, `end`) VALUES
(5, 1, 'Embarque', '2023-02-22 04:01:00', '2023-02-09 04:01:00'),
(6, 5, 'Descarga', '2023-02-01 04:15:00', '2023-02-13 04:15:00');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `conteiner`
--
ALTER TABLE `conteiner`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `movement`
--
ALTER TABLE `movement`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `conteiner`
--
ALTER TABLE `conteiner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `movement`
--
ALTER TABLE `movement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
