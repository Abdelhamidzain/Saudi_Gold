<?php
/**
 * Saudi Gold v2 - Blog Page
 * صفحة عرض المقالات
 */

$ARTICLES_FILE = __DIR__ . '/admin/data/articles.json';

function getPublishedArticles() {
    global $ARTICLES_FILE;
    if (!file_exists($ARTICLES_FILE)) return [];
    $articles = json_decode(file_get_contents($ARTICLES_FILE), true) ?: [];
    return array_filter($articles, fn($a) => $a['published']);
}

$articles = getPublishedArticles();
$article = null;

// Single article view
if (isset($_GET['slug'])) {
    foreach ($articles as $a) {
        if ($a['slug'] === $_GET['slug']) {
            $article = $a;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $article ? htmlspecialchars($article['title']) . ' | ' : '' ?>مدونة سعودي قولد - أخبار ومقالات الذهب</title>
    <meta name="description" content="<?= $article ? htmlspecialchars($article['excerpt']) : 'مقالات ونصائح عن الذهب في السعودية. تعلم كيفية شراء الذهب، حساب الزكاة، وأفضل أوقات الاستثمار.' ?>">
    <link rel="canonical" href="https://saudi-gold.com/blog.php<?= $article ? '?slug=' . $article['slug'] : '' ?>">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🪙%3C/text%3E%3C/svg%3E">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <style>
        .blog-header { padding: 3rem 0; text-align: center; }
        .articles-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; }
        .article-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 1.5rem; transition: all 0.25s; }
        .article-card:hover { border-color: var(--border-gold); transform: translateY(-4px); }
        .article-card h3 { margin-bottom: 0.75rem; font-size: 1.25rem; }
        .article-card h3 a { color: inherit; }
        .article-card h3 a:hover { color: var(--gold-400); }
        .article-excerpt { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7; margin-bottom: 1rem; }
        .article-meta { font-size: 0.8rem; color: var(--text-muted); }
        .article-content { max-width: 800px; margin: 0 auto; }
        .article-content h1 { margin-bottom: 1rem; }
        .article-content .meta { color: var(--text-muted); margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color); }
        .article-content .body { line-height: 2; color: var(--text-secondary); }
        .article-content .body p { margin-bottom: 1.5rem; }
        .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--gold-400); margin-bottom: 2rem; }
        .back-link:hover { text-decoration: underline; }
        .empty-state { text-align: center; padding: 4rem 2rem; color: var(--text-muted); }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-inner">
                <a href="/" class="logo">
                    <span class="logo-icon">🪙</span>
                    <span class="text-gold">سعودي قولد</span>
                </a>
                <nav class="nav" id="mainNav">
                    <a href="/" class="nav-link">الرئيسية</a>
                    <a href="/#prices" class="nav-link">أسعار الذهب</a>
                    <a href="/#calculator" class="nav-link">الحاسبة</a>
                    <a href="/blog.php" class="nav-link active">المدونة</a>
                </nav>
            </div>
        </div>
    </header>

    <main>
        <div class="container">
            <?php if ($article): ?>
            <!-- Single Article -->
            <div class="blog-header">
                <a href="/blog.php" class="back-link">← العودة للمدونة</a>
            </div>
            <article class="article-content">
                <h1><?= htmlspecialchars($article['title']) ?></h1>
                <div class="meta">📅 <?= date('Y/m/d', strtotime($article['created_at'])) ?></div>
                <div class="body">
                    <?= nl2br(htmlspecialchars($article['content'])) ?>
                </div>
            </article>
            
            <?php elseif (!empty($articles)): ?>
            <!-- Articles List -->
            <div class="blog-header">
                <h1>📝 مدونة <span class="text-gold">سعودي قولد</span></h1>
                <p style="color:var(--text-secondary);margin-top:1rem">مقالات ونصائح عن الذهب في السعودية</p>
            </div>
            <div class="articles-grid">
                <?php foreach (array_reverse($articles) as $a): ?>
                <div class="article-card">
                    <h3><a href="/blog.php?slug=<?= $a['slug'] ?>"><?= htmlspecialchars($a['title']) ?></a></h3>
                    <p class="article-excerpt"><?= htmlspecialchars($a['excerpt']) ?>...</p>
                    <div class="article-meta">📅 <?= date('Y/m/d', strtotime($a['created_at'])) ?></div>
                </div>
                <?php endforeach; ?>
            </div>
            
            <?php else: ?>
            <!-- Empty State -->
            <div class="blog-header">
                <h1>📝 مدونة <span class="text-gold">سعودي قولد</span></h1>
            </div>
            <div class="empty-state">
                <p style="font-size:3rem;margin-bottom:1rem">📝</p>
                <p>لا توجد مقالات منشورة بعد</p>
                <p style="margin-top:0.5rem;font-size:0.9rem">قريباً سنضيف مقالات عن الذهب والاستثمار</p>
            </div>
            <?php endif; ?>
        </div>
    </main>

    <footer class="footer" style="margin-top:4rem">
        <div class="container">
            <div class="footer-bottom">
                <p class="footer-copyright">© ٢٠٢٥ سعودي قولد - جميع الحقوق محفوظة</p>
            </div>
        </div>
    </footer>
</body>
</html>
