# NFT Pic Gen

This is a simple Node.js script for generating random NFT art images. The generated images are in PNG format and can be saved to a file, For now the script is only generating random colored shapes and a random background. The goal is to make PNG images on top of each other to generate a unique image.

## Installation

To use this script, you'll need to have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) installed on your machine.

Clone the repository and install the required dependencies by running the following commands:

```
$ git clone https://github.com/elhadjx/nftpicgen.git
$ cd nftpicgen
$ npm install
```

## Usage

To generate an NFT art image, simply run the following command:

```
$ node index.js
```

The generated images will be saved to `out/nft${index}.png`.

## Contributing

If you'd like to contribute to this project, please fork the repository and make your changes. Pull requests are welcome!

### Client

The client is the platform, built in [ReactJS](https://reactjs.org/).

```
$ git clone https://github.com/elhadjx/nftpicgen.git
$ cd nftpicgen/client
$ npm install
$ npm run dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
