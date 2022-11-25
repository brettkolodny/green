import lustre/element.{Element, div, p, text}
import islands/counter.{default as counter}
import gleam/io

pub fn default() {
  div([], [p([], [text("Hello world")]), counter()])
}
