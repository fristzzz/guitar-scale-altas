# Guitar Scale Atlas

一个零依赖的静态吉他指板练习页面，用来可视化音阶、和弦、3NPS 指型和 CAGED shape 在 24 品指板上的分布关系。

在线访问：

- https://fristzzz.github.io/guitar-scale-altas/

## 功能

- `Scale / Chord` 两种视图切换
- 12 个主音选择
- 七种自然调式：`Ionian / Dorian / Phrygian / Lydian / Mixolydian / Aeolian / Locrian`
- `3NPS Position 1-7` 高亮
- 常见和弦高亮：`maj / min / 7 / maj7 / min7 / dim / aug / sus2 / sus4`
- 和弦视图下支持 `C / A / G / E / D` 的 CAGED shape 强调
- 标签支持显示音名或级数/和弦音程
- 多主题切换
- 标准六弦 `E A D G B E`，24 品全指板显示

## 项目结构

```text
.
├── index.html
├── styles.css
└── app.js
```

## 本地使用

这是一个纯静态页面，不需要安装依赖。

直接打开：

- `index.html`

或者在目录里启动一个简单静态服务，例如：

```bash
cd ~/app/guitar-scale-atlas
python3 -m http.server 4173
```

然后访问：

- http://127.0.0.1:4173

## 说明

- 当前版本只支持标准六弦吉他
- 音名统一使用升号体系，不处理 `Bb / Eb` 这类等音拼写切换
- 页面以练习器为目标，不包含声音播放、节拍器或收藏功能
