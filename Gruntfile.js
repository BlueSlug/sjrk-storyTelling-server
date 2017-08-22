// Declare dependencies
/* global module */

"use strict";

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        // Project package file destination.
        pkg: grunt.file.readJSON("package.json"),
        eslint: {
            all: ["src/**/*.js", "tests/**/*.js", "demos/**/*.js", "examples/**/*.js", "*.js"]
        },
        jsonlint: {
            all: ["package.json", ".jshintrc", "src/**/*.json", "tests/**/*.json", "demos/**/*.json", "!node_modules", "!src/lib/**", "!tests/lib/**"]
        },
        // set up the CouchDB database
        http: {
            add: {
                options: {
                    url: "http://localhost:5984/stories2",
                    method: "put"
                }
            }
        },
        // // populate the CouchDB database
        // exec: {
        //     load: {
        //         cmd: "cat ./stories2.json | cdbload -v -d stories2"
        //     }
        // }
        mkcouchdb: {
            demo: {
                db: 'http://localhost:5984/stories2',
                options: {
                    okay_if_exists: true
                }
            }
        }
    });

    // Load the plugin(s):
    grunt.loadNpmTasks("fluid-grunt-eslint");
    grunt.loadNpmTasks("grunt-couchapp");
    grunt.loadNpmTasks("grunt-http");
    grunt.loadNpmTasks("grunt-jsonlint");

    // Custom tasks:

    grunt.registerTask("default", ["lint"]);
    grunt.registerTask("lint", "Apply eslint and jsonlint", ["eslint", "jsonlint"]);
    grunt.registerTask("loadcouchdb", "Load CouchDB from JSON file", ["mkcouchdb"]);
};
