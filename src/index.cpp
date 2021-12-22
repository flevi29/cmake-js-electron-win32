#include <napi.h>

Napi::String Hello(const Napi::CallbackInfo &info) {
    return Napi::String::New(info.Env(), "Hello, world!");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports["Hello"] = Napi::Function::New(env, Hello);
    return exports;
}

NODE_API_MODULE(CMAKEELECTRON, Init)
