cmake_minimum_required(VERSION 3.20)
project(cmake-js-electron)
set(CMAKE_CXX_STANDARD 20)

set(sources "${PROJECT_SOURCE_DIR}/src")

include_directories(
        ${CMAKE_JS_INC}
        # Required for some IDE(s) to recognize node_api.h location
        # Comment this, once done writing the addon
        # "C:/$ENV{homepath}/.cmake-js/electron-x64/v16.0.5/include/node"
)

file(GLOB SOURCE_FILES
        "${sources}/index.cpp"
        )
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

# Include node-addon-api wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})

add_definitions(-DNAPI_VERSION=8)
add_definitions(-DUNICODE)
add_definitions(-D_UNICODE)
