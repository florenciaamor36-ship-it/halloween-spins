extends Node2D

const SYMBOLS := ["pumpkin", "ghost", "bat", "cauldron", "castle", "10", "J", "Q", "K", "A", "wild", "scatter", "bonus"]
const COLS := 5
const ROWS := 3
const CELL := Vector2(108, 112)
var origin := Vector2.ZERO

var balance := 10000
var bet := 50
var spinning := false
var symbols: Array[Sprite2D] = []
var symbol_values: Array[int] = []
var balance_label: Label
var bet_label: Label
var win_label: Label
var spin_button: Button

func _ready() -> void:
    origin = Vector2((get_viewport_rect().size.x - CELL.x * (COLS - 1)) / 2.0, 285)
    _build_background()
    _build_reels()
    _build_controls()

func _build_background() -> void:
    var title := Label.new()
    title.text = "HALLOWEEN SPINS"
    title.position = Vector2(155, 55)
    title.add_theme_font_size_override("font_size", 30)
    title.add_theme_color_override("font_color", Color("#d8ff82"))
    add_child(title)

    var subtitle := Label.new()
    subtitle.text = "Godot edition"
    subtitle.position = Vector2(295, 100)
    subtitle.add_theme_color_override("font_color", Color("#a7b0c4"))
    add_child(subtitle)

func _build_reels() -> void:
    for row in ROWS:
        for col in COLS:
            var sprite := Sprite2D.new()
            sprite.position = origin + Vector2(col * CELL.x, row * CELL.y)
            sprite.texture = _load_symbol(SYMBOLS[randi() % SYMBOLS.size()])
            sprite.scale = Vector2(0.72, 0.72)
            add_child(sprite)
            symbols.append(sprite)
            symbol_values.append(0)

func _load_symbol(symbol: String) -> Texture2D:
    var texture := load("res://assets/symbols/%s.webp" % symbol) as Texture2D
    return texture

func _build_controls() -> void:
    balance_label = _make_label("BALANCE  $%d" % balance, Vector2(70, 700), 20)
    bet_label = _make_label("BET  $%d" % bet, Vector2(70, 755), 20)
    win_label = _make_label("WIN  $0", Vector2(390, 700), 20)

    spin_button = Button.new()
    spin_button.text = "SPIN"
    spin_button.position = Vector2(230, 850)
    spin_button.size = Vector2(260, 78)
    spin_button.add_theme_font_size_override("font_size", 25)
    spin_button.pressed.connect(spin)
    add_child(spin_button)

    var minus := Button.new()
    minus.text = "−"
    minus.position = Vector2(110, 850)
    minus.size = Vector2(85, 78)
    minus.pressed.connect(_decrease_bet)
    add_child(minus)

    var plus := Button.new()
    plus.text = "+"
    plus.position = Vector2(525, 850)
    plus.size = Vector2(85, 78)
    plus.pressed.connect(_increase_bet)
    add_child(plus)

func _make_label(text: String, position: Vector2, font_size: int) -> Label:
    var label := Label.new()
    label.text = text
    label.position = position
    label.add_theme_font_size_override("font_size", font_size)
    label.add_theme_color_override("font_color", Color("#d8ff82"))
    add_child(label)
    return label

func _increase_bet() -> void:
    if not spinning:
        bet = mini(bet + 25, 500)
        bet_label.text = "BET  $%d" % bet

func _decrease_bet() -> void:
    if not spinning:
        bet = maxi(bet - 25, 25)
        bet_label.text = "BET  $%d" % bet

func spin() -> void:
    if spinning or balance < bet:
        return
    spinning = true
    spin_button.disabled = true
    balance -= bet
    balance_label.text = "BALANCE  $%d" % balance
    var final_values: Array[int] = []
    for i in COLS * ROWS:
        final_values.append(randi() % SYMBOLS.size())

    for col in COLS:
        var delay := 0.75 + col * 0.22
        get_tree().create_timer(delay).timeout.connect(_stop_column.bind(col, final_values))

func _stop_column(col: int, final_values: Array[int]) -> void:
    for row in ROWS:
        var index := col + row * COLS
        symbol_values[index] = final_values[index]
        symbols[index].texture = _load_symbol(SYMBOLS[final_values[index]])
        var target := origin + Vector2(col * CELL.x, row * CELL.y)
        var tween := create_tween()
        symbols[index].position = target + Vector2(0, 25)
        tween.tween_property(symbols[index], "position", target, 0.22).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)

    if col == COLS - 1:
        get_tree().create_timer(0.25).timeout.connect(_finish_spin)

func _finish_spin() -> void:
    spinning = false
    spin_button.disabled = false
    var win := _calculate_win()
    balance += win
    win_label.text = "WIN  $%d" % win
    balance_label.text = "BALANCE  $%d" % balance

func _calculate_win() -> int:
    return bet * 2 if symbol_values[1] == symbol_values[6] and symbol_values[6] == symbol_values[11] else 0
