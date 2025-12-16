<?php
/**
 * Saudi Gold v2 - Simple Blog Admin Panel
 * لوحة تحكم بسيطة لإدارة المقالات
 * 
 * ⚠️ ملاحظة: هذا حل بسيط للمدونة
 * للحصول على مميزات أكثر، استخدم Strapi أو Contentful
 */

session_start();

// Configuration
$ADMIN_USERNAME = 'admin';
$ADMIN_PASSWORD = 'saudi-gold-2025'; // غيّر كلمة المرور!
$ARTICLES_FILE = __DIR__ . '/data/articles.json';

// Create data directory if not exists
if (!is_dir(__DIR__ . '/data')) {
    mkdir(__DIR__ . '/data', 0755, true);
}

// Initialize articles file
if (!file_exists($ARTICLES_FILE)) {
    file_put_contents($ARTICLES_FILE, json_encode([], JSON_UNESCAPED_UNICODE));
}

// Helper functions
function getArticles() {
    global $ARTICLES_FILE;
    return json_decode(file_get_contents($ARTICLES_FILE), true) ?: [];
}

function saveArticles($articles) {
    global $ARTICLES_FILE;
    file_put_contents($ARTICLES_FILE, json_encode($articles, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

function isLoggedIn() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

// Handle login
if (isset($_POST['login'])) {
    if ($_POST['username'] === $ADMIN_USERNAME && $_POST['password'] === $ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
    } else {
        $error = 'اسم المستخدم أو كلمة المرور غير صحيحة';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Handle article operations
if (isLoggedIn()) {
    // Save article
    if (isset($_POST['save_article'])) {
        $articles = getArticles();
        $article = [
            'id' => $_POST['id'] ?: uniqid(),
            'title' => $_POST['title'],
            'slug' => preg_replace('/[^a-z0-9\-]/', '', str_replace(' ', '-', mb_strtolower($_POST['title']))),
            'content' => $_POST['content'],
            'excerpt' => mb_substr(strip_tags($_POST['content']), 0, 200),
            'created_at' => $_POST['created_at'] ?: date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'published' => isset($_POST['published'])
        ];
        
        // Update or add
        $found = false;
        foreach ($articles as $i => $a) {
            if ($a['id'] === $article['id']) {
                $articles[$i] = $article;
                $found = true;
                break;
            }
        }
        if (!$found) {
            $articles[] = $article;
        }
        
        saveArticles($articles);
        $success = 'تم حفظ المقال بنجاح';
    }
    
    // Delete article
    if (isset($_GET['delete'])) {
        $articles = getArticles();
        $articles = array_filter($articles, fn($a) => $a['id'] !== $_GET['delete']);
        saveArticles(array_values($articles));
        header('Location: index.php?deleted=1');
        exit;
    }
}

$articles = getArticles();
$editArticle = null;
if (isset($_GET['edit'])) {
    foreach ($articles as $a) {
        if ($a['id'] === $_GET['edit']) {
            $editArticle = $a;
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
    <title>لوحة التحكم - سعودي قولد</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Tajawal', sans-serif; background: #0A0A0F; color: #fff; min-height: 100vh; direction: rtl; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 30px; }
        .logo { font-size: 1.5rem; font-weight: 700; color: #F59E0B; }
        .btn { padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
        .btn-gold { background: linear-gradient(135deg, #D4AF37, #F5D061); color: #000; }
        .btn-gold:hover { transform: translateY(-2px); }
        .btn-danger { background: #EF4444; color: #fff; }
        .btn-secondary { background: rgba(255,255,255,0.1); color: #fff; }
        .card { background: #1A1A24; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; margin-bottom: 20px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; margin-bottom: 8px; color: #A0A0B0; font-size: 0.9rem; }
        .form-input, .form-textarea { width: 100%; padding: 12px; background: #12121A; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; font-size: 1rem; font-family: inherit; }
        .form-input:focus, .form-textarea:focus { border-color: #F59E0B; outline: none; }
        .form-textarea { min-height: 300px; resize: vertical; }
        .articles-list { display: grid; gap: 16px; }
        .article-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px; }
        .article-title { font-weight: 600; margin-bottom: 4px; }
        .article-meta { font-size: 0.8rem; color: #6B6B7B; }
        .article-actions { display: flex; gap: 8px; }
        .alert { padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; }
        .alert-success { background: rgba(34, 197, 94, 0.2); color: #22C55E; }
        .alert-error { background: rgba(239, 68, 68, 0.2); color: #EF4444; }
        .login-box { max-width: 400px; margin: 100px auto; }
        .checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .checkbox-label input { width: 18px; height: 18px; }
        .tabs { display: flex; gap: 8px; margin-bottom: 24px; }
        .tab { padding: 10px 20px; background: rgba(255,255,255,0.05); border-radius: 8px; cursor: pointer; }
        .tab.active { background: #F59E0B; color: #000; }
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
    </style>
</head>
<body>
    <div class="container">
        <?php if (!isLoggedIn()): ?>
        <!-- Login Form -->
        <div class="login-box">
            <div class="card">
                <h2 style="text-align:center;margin-bottom:24px;color:#F59E0B">🪙 لوحة التحكم</h2>
                <?php if (isset($error)): ?>
                    <div class="alert alert-error"><?= $error ?></div>
                <?php endif; ?>
                <form method="POST">
                    <div class="form-group">
                        <label class="form-label">اسم المستخدم</label>
                        <input type="text" name="username" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">كلمة المرور</label>
                        <input type="password" name="password" class="form-input" required>
                    </div>
                    <button type="submit" name="login" class="btn btn-gold" style="width:100%">تسجيل الدخول</button>
                </form>
            </div>
        </div>
        <?php else: ?>
        <!-- Admin Panel -->
        <div class="header">
            <div class="logo">🪙 لوحة التحكم - سعودي قولد</div>
            <div>
                <a href="../" class="btn btn-secondary" style="margin-left:8px">🌐 زيارة الموقع</a>
                <a href="?logout" class="btn btn-danger">خروج</a>
            </div>
        </div>
        
        <?php if (isset($success)): ?>
            <div class="alert alert-success"><?= $success ?></div>
        <?php endif; ?>
        <?php if (isset($_GET['deleted'])): ?>
            <div class="alert alert-success">تم حذف المقال بنجاح</div>
        <?php endif; ?>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
            <!-- Article Form -->
            <div class="card">
                <h3 style="margin-bottom:20px"><?= $editArticle ? 'تعديل المقال' : 'مقال جديد' ?></h3>
                <form method="POST">
                    <input type="hidden" name="id" value="<?= $editArticle['id'] ?? '' ?>">
                    <input type="hidden" name="created_at" value="<?= $editArticle['created_at'] ?? '' ?>">
                    
                    <div class="form-group">
                        <label class="form-label">عنوان المقال</label>
                        <input type="text" name="title" class="form-input" value="<?= htmlspecialchars($editArticle['title'] ?? '') ?>" required placeholder="مثال: كيفية شراء الذهب في السعودية">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">محتوى المقال</label>
                        <textarea name="content" class="form-textarea" required placeholder="اكتب محتوى المقال هنا..."><?= htmlspecialchars($editArticle['content'] ?? '') ?></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="published" <?= ($editArticle['published'] ?? false) ? 'checked' : '' ?>>
                            نشر المقال
                        </label>
                    </div>
                    
                    <div style="display:flex;gap:8px">
                        <button type="submit" name="save_article" class="btn btn-gold">💾 حفظ المقال</button>
                        <?php if ($editArticle): ?>
                            <a href="index.php" class="btn btn-secondary">إلغاء</a>
                        <?php endif; ?>
                    </div>
                </form>
            </div>
            
            <!-- Articles List -->
            <div class="card">
                <h3 style="margin-bottom:20px">📝 المقالات (<?= count($articles) ?>)</h3>
                <div class="articles-list">
                    <?php if (empty($articles)): ?>
                        <p style="color:#6B6B7B;text-align:center;padding:40px">لا توجد مقالات بعد</p>
                    <?php else: ?>
                        <?php foreach (array_reverse($articles) as $article): ?>
                            <div class="article-item">
                                <div>
                                    <div class="article-title">
                                        <?= htmlspecialchars($article['title']) ?>
                                        <?php if (!$article['published']): ?>
                                            <span style="color:#F59E0B;font-size:0.75rem">(مسودة)</span>
                                        <?php endif; ?>
                                    </div>
                                    <div class="article-meta"><?= $article['created_at'] ?></div>
                                </div>
                                <div class="article-actions">
                                    <a href="?edit=<?= $article['id'] ?>" class="btn btn-secondary" style="padding:6px 12px">✏️</a>
                                    <a href="?delete=<?= $article['id'] ?>" class="btn btn-danger" style="padding:6px 12px" onclick="return confirm('هل أنت متأكد من حذف هذا المقال؟')">🗑️</a>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        
        <!-- Help -->
        <div class="card" style="margin-top:24px">
            <h3 style="margin-bottom:16px">💡 نصائح</h3>
            <ul style="color:#A0A0B0;line-height:2;padding-right:20px">
                <li>غيّر كلمة المرور الافتراضية في ملف <code style="background:#12121A;padding:2px 6px;border-radius:4px">index.php</code></li>
                <li>المقالات تُخزن في ملف <code style="background:#12121A;padding:2px 6px;border-radius:4px">data/articles.json</code></li>
                <li>لعرض المقالات في الموقع، استخدم صفحة <code style="background:#12121A;padding:2px 6px;border-radius:4px">blog.php</code></li>
                <li>للحصول على مميزات أكثر، استخدم <a href="https://strapi.io" target="_blank" style="color:#F59E0B">Strapi</a> أو <a href="https://www.contentful.com" target="_blank" style="color:#F59E0B">Contentful</a></li>
            </ul>
        </div>
        <?php endif; ?>
    </div>
</body>
</html>
