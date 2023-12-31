-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-12-2022 a las 10:38:00
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `banca_reto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `dniCliente` varchar(9) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `pasahitza` varchar(18) NOT NULL,
  `secreto` int(11) NOT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`dniCliente`, `nombre`, `pasahitza`, `secreto`, `tipo`) VALUES
('32465784F', 'Fatima', '3456', 3321, 0),
('34157377Z', 'Ander', '4567', 652, 1),
('34323751G', 'Markel', '2345', 2435, 0),
('34455777P', 'Javier', '1234', 1900, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta_corriente`
--

CREATE TABLE `cuenta_corriente` (
  `iban` varchar(24) NOT NULL,
  `dniCliente` varchar(9) NOT NULL,
  `titular` varchar(70) NOT NULL,
  `saldo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cuenta_corriente`
--

INSERT INTO `cuenta_corriente` (`iban`, `dniCliente`, `titular`, `saldo`) VALUES
('ES1220900000450350000001', '34455777P', 'Javier Saez B', 46),
('ES1220900000450350000002', '34455777P', 'Javier Saez A', 43);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta_movimiento`
--

CREATE TABLE `cuenta_movimiento` (
  `iban` varchar(24) NOT NULL,
  `idMovimiento` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento`
--

CREATE TABLE `movimiento` (
  `idMovimiento` int(11) NOT NULL,
  `tipoMovimiento` varchar(30) NOT NULL,
  `concepto` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`dniCliente`);

--
-- Indices de la tabla `cuenta_corriente`
--
ALTER TABLE `cuenta_corriente`
  ADD PRIMARY KEY (`iban`),
  ADD KEY `dniCliente` (`dniCliente`);

--
-- Indices de la tabla `cuenta_movimiento`
--
ALTER TABLE `cuenta_movimiento`
  ADD PRIMARY KEY (`idMovimiento`,`iban`),
  ADD KEY `fk_cuenta_cr` (`iban`);

--
-- Indices de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`idMovimiento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  MODIFY `idMovimiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cuenta_corriente`
--
ALTER TABLE `cuenta_corriente`
  ADD CONSTRAINT `cuenta_corriente_ibfk_1` FOREIGN KEY (`dniCliente`) REFERENCES `cliente` (`dniCliente`);

--
-- Filtros para la tabla `cuenta_movimiento`
--
ALTER TABLE `cuenta_movimiento`
  ADD CONSTRAINT `fk_cuenta_cr` FOREIGN KEY (`iban`) REFERENCES `cuenta_corriente` (`iban`),
  ADD CONSTRAINT `fk_id_mv` FOREIGN KEY (`idMovimiento`) REFERENCES `movimiento` (`idMovimiento`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
