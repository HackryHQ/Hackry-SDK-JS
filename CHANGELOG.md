# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2018-03-02
### Added
- Add tests for all resources.

### Changed
- Use `axios` for all network requests.
- Distribute package as UMD webpack bundle.

### Fixed
- Fix incorrect events sort order.

## [1.3.1] - 2018-02-11
### Fixed
- Fixed incorrect date formatting keys in README.

## [1.3.0] - 2018-02-11
### Added
- `/announcements` and `/events` routes now allow the user to specify the
  `timeZone` used for date formatting.

## [1.2.0] - 2018-01-31
### Added
- `/announcements` and `/events` routes now support date formatting.

## [1.1.0] - 2018-01-17
### Added
- Attendee registration helper method.

[Unreleased]: https://github.com/HackryHQ/Hackry-SDK-JS/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/HackryHQ/Hackry-SDK-JS/compare/v1.3.1...v2.0.0
[1.3.1]: https://github.com/HackryHQ/Hackry-SDK-JS/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/HackryHQ/Hackry-SDK-JS/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/HackryHQ/Hackry-SDK-JS/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/HackryHQ/Hackry-SDK-JS/compare/v1.0.0...v1.1.0
