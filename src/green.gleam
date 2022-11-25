import gleam/io
import gleam/javascript/promise.{Promise}

pub fn main() {
  use manifest <- promise.then(get_manifest())
  start(manifest)
}

pub external type Manifest

external fn get_manifest() -> Promise(Manifest) =
  "./ffi.js" "getManifest"

external fn start(manifest: Manifest) -> Promise(Nil) =
  "./ffi.js" "start"