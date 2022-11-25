import gleam/int
import lustre/element.{button, div, p, stateful, text}
import lustre/event.{on_click}

pub type Action {
  Increment
  Decrement
}

pub fn default() {
  use count, set_count <- stateful(1)

  let update = fn(action: Action) {
    case action {
      Increment -> set_count(count + 1)
      Decrement -> set_count(count - 1)
    }
  }

  div(
    [],
    [
      button([on_click(fn(_) { update(Decrement) })], [text("-")]),
      p([], [text(int.to_string(count))]),
      button([on_click(fn(_) { update(Increment) })], [text("+")]),
    ],
  )
  
}
